import React, { useEffect, useState } from "react";
import PageLoader from "../components/Loader/PageLoader";
import { useParams } from "react-router-dom";
import { dataSortByType } from "../utils/utils";
import { getByUsername } from "../api-services/userService";
import { deleteCollection } from "../api-services/collectionService";
import CollectionitemV2 from "../components/Collectionitem/CollectionCardV2";
import BaseLayout from "../components/Layout/BaseLayout/BaseLayout";
import CollectionHeader from "../components/Header/CollectionHeader";
const Home = ({ user, handleSetUser, windowWidth }) => {
  const { username } = useParams();

  const [vistiedUser, setVisitiedUser] = useState({});
  // sort by dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // gloabl collections
  const [collections, SetCollections] = useState([]);

  // Filterd/search collection that will be shown
  const [filteredCollection, setFiltererdCollection] = useState([]);

  // Name of User
  const [nameOfUser, setNameofUser] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getCollections = async () => {
      try {
        const res = await getByUsername(username);
        const sorteData = dataSortByType(res.data.data.collections);
        let publicCollection = 0;
        let privateCollection = 0;
        sorteData.map((data) =>
          data.isPublic ? publicCollection++ : privateCollection++
        );
        SetCollections(sorteData);
        setFiltererdCollection(sorteData);
        setNameofUser(res.data.data.name);
        if (user.isLoggedIn) {
          if (username === user.username) {
            //Means Loggedin user visintig their own profile so no need of fetching the data of the user
            setVisitiedUser({
              username: res.data.data.username,
              name: res.data.data.name,
              email: res.data.data.email,
              isLoggedIn: true,
              isOwner: true,
              link: {
                publicCollection,
                privateCollection,
              },
            });
          } else {
            // Loggedin user has Vistied others profile so need to get the user info
            // api call
            setVisitiedUser({
              username: res.data.data.username,
              name: res.data.data.name,
              isLoggedIn: true,
              isOwner: false,
              link: {
                publicCollection,
                privateCollection,
              },
            });
          }
        }
        // Not loogedIn
        else {
          setVisitiedUser({
            username: res.data.data.username,
            name: res.data.data.name,
            isLoggedIn: false,
            isOwner: false,
            link: {
              publicCollection,
              privateCollection,
            },
          });
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getCollections();
  }, [user]);

  const searchHnadeler = (e) => {
    e.preventDefault();
    // As we need to search in global collections
    const tempCollections = [...collections];
    let newfilteredCollection = tempCollections;
    if (e.target.value !== "") {
      newfilteredCollection = tempCollections.filter((collection) =>
        collection.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
    }
    setFiltererdCollection(newfilteredCollection);
  };
  // Bookmark delete handler
  const deleteHandler = async (collectionId) => {
    try {
      const newdata = collections.filter(
        (collection) => collection._id !== collectionId
      );
      setFiltererdCollection(newdata);
      SetCollections(newdata);
      await deleteCollection(collectionId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseLayout>
      {/* Top bar */}
      <CollectionHeader windowWidth={windowWidth} isOwner={true} name={`Oyo ${user.username}`} searchHnadeler={searchHnadeler}/>
      {/* Collections */}
      <div className=" w-full h-[70%]">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <PageLoader />
          </div>
        ) : filteredCollection.length > 0 ? (
          <div className="flex items-start justify-start w-full h-full pl-8 mx-auto overflow-y-scroll 3xl:pl-0 3xl:justify-center">
            <div className="w-full justify-start flex flex-wrap gap-2 2xl:gap-6 max-w-[1500px]">
              {filteredCollection.map((collections) => (
                <CollectionitemV2
                  id={collections._id}
                  image={collections.image}
                  title={collections.title}
                  links={collections.timelines.length}
                  type={collections.isPublic}
                  description={collections.description}
                  username={collections.username}
                  windowWidth={windowWidth}
                  onDelete={deleteHandler}
                  isOwner={vistiedUser.isOwner}
                  vistiedUser={vistiedUser}
                  votes={collections.votes}
                  views={collections.views}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="mb-5 text-5xl text-textPrimary">
              No Collection Found
            </p>
            <p className="text-textPrimary">You can add it from extension</p>
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default Home;
