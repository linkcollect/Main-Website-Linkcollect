import React, { useContext, useRef } from 'react';
import Twitter from '../../../assets/twitterBlue.svg';
import Website from '../../../assets/websiteIcon.svg';
import DarkModeWebsite from '../../../assets/darkMode/websiteIcon.svg';
import DarkModeTwitter from '../../../assets/darkMode/twitterWhite.svg';
import Copy from '../../../assets/copyIcon.svg';
import CopyWhiteIcon from '../../../assets/darkMode/whiteCopyIcon.svg';
import profile from '../../../assets/defaultProfile.svg';
import Back from '../../../assets/back-arrow.svg';
import DarkModeBack from '../../../assets/darkMode/WhiteBackArrow.svg';
import Button from '../../UI/Button/Button';
import approve from '../../../assets/approve.svg';
import WhiteApprove from '../../../assets/darkMode/whiteCheck.svg';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { switchMode } from '../../../hooks/switchMode';
const ProfileHeader = ({
  name,
  socials,
  imageUrl,
  totalViews,
  totalCollections,
  username,
  bio,
}) => {
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const copyRef = useRef();
  const copyMobileRef = useRef();

  const location = useLocation();

  // getting current selected mode
  const { selectedMode } = useContext(switchMode);

  // TODO: Need to change logic to copy link
  const copyLinkHandler = () => {
    navigator.clipboard.writeText(`https://linkcollect.io/${username}`);
    if (copyRef.current) {
      copyRef.current.src = selectedMode === 'light' ? approve : WhiteApprove;
      setTimeout(() => {
        try {
          copyRef.current.src = selectedMode === 'light' ? Copy : CopyWhiteIcon;
        } catch (error) {
          // console.error(error)
        }
      }, 500);
      if (copyMobileRef.current) {
        copyMobileRef.current.src =
          selectedMode === 'light' ? approve : WhiteApprove;
        setTimeout(() => {
          try {
            copyMobileRef.current.src =
              selectedMode === 'light' ? Copy : CopyWhiteIcon;
          } catch (error) {
            // console.error(error)
          }
        }, 500);
      }
    }
  };
  const backHnadler = () => {
    if (!auth.isLoggedIn) {
      navigate('/login');
    } else {
      navigate(location?.state?.fromCollection ? -1 : `/explore`);
    }
  };

  return (
    <div className="flex flex-col items-start justify-center w-full gap-8 mx-auto 3xl:px-0 max-w-[1500px] pb-5">
      <div className="flex flex-col items-start justify-center w-full gap-6">
        {/* back button */}
        <Button
          variant={
            selectedMode === 'light' ? 'secondaryOutline' : 'darkOutlined'
          }
          className={`
                w-[91px] h-[41px] pr-31`}
          onClick={backHnadler}
        >
          {selectedMode === 'light' ? (
            <img src={Back} alt="" className="" />
          ) : (
            <img src={DarkModeBack} alt="" className="" />
          )}
          Back
        </Button>

        <div className="flex items-start justify-between w-full">
          {/*visited user's details*/}
          <div className="flex flex-col items-center justify-start w-full gap-5 sm:flex-row">
            {/* Profile photo */}
            <img
              src={imageUrl ? imageUrl : profile}
              alt=""
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col items-center justify-start w-full gap-3 sm:items-start">
              {/* Name */}
              <div className="flex flex-row gap-2">
                <p
                  className={`text-lg font-medium 
                  ${
                    selectedMode === 'light'
                      ? 'text-neutral-900'
                      : 'text-neutral-50'
                  }`}
                >
                  {name}
                </p>
                {selectedMode === 'light' ? (
                  <img
                    ref={copyMobileRef}
                    src={Copy}
                    alt=""
                    onClick={copyLinkHandler}
                    className="cursor-pointer sm:hidden"
                  />
                ) : (
                  <img
                    ref={copyMobileRef}
                    src={CopyWhiteIcon}
                    alt=""
                    onClick={copyLinkHandler}
                    className="cursor-pointer sm:hidden"
                  />
                )}
              </div>

              {/* Bio */}
              <div className="flex items-center justify-between w-full gap-3 sm:justify-start">
                <p
                  className={`text-sm ${
                    selectedMode === 'light'
                      ? 'text-dark-secondary'
                      : 'text-neutral-100'
                  } `}
                >
                  {bio}{' '}
                </p>
              </div>

              {/*No. of Views and collections */}
              <div className="flex items-center justify-between w-full gap-3 sm:justify-start">
                <span
                  className={`text-xs font-normal ${
                    selectedMode === 'light'
                      ? 'text-neutral-600'
                      : 'text-borderPrimary'
                  }`}
                >
                  Total Collections {totalCollections}
                </span>
                <span
                  className={`text-xs font-normal  ${
                    selectedMode === 'light'
                      ? 'text-neutral-600'
                      : 'text-borderPrimary'
                  }`}
                >
                  Total views {totalViews}
                </span>
              </div>
            </div>
          </div>

          {/* socials and profile link */}
          <div className="flex items-center justify-center gap-1.5">
            {/* Social Links */}
            {/* Logic Ramining */}
            {socials?.length > 1 && socials[0] && socials[1] && (
              <>
                {socials[0].length > 5 && (
                  <a
                    href={socials[0]}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-1 p-1.5 w-8 rounded justify-center ${
                      selectedMode === 'light'
                        ? 'bg-neutral-200 border-primary-200'
                        : 'bg-dark-primary border-dark-border '
                    } border h-8 `}
                  >
                    {selectedMode === 'light' ? (
                      <img src={Twitter} alt="" className="w-5 h-5 " />
                    ) : (
                      <img src={DarkModeTwitter} alt="" className="w-5 h-5 " />
                    )}
                  </a>
                )}
                {socials[1].length > 5 && (
                  <a
                    href={socials[1]}
                    target="_blank"
                    rel="noreferrer"
                    className={` flex items-center gap-1 p-1.5 w-8 rounded justify-center ${
                      selectedMode === 'light'
                        ? 'bg-neutral-200 border-primary-200'
                        : 'bg-dark-primary border-dark-border '
                    } border h-8  `}
                  >
                    {selectedMode === 'light' ? (
                      <img src={Website} alt="" className="w-5 h-5 " />
                    ) : (
                      <img src={DarkModeWebsite} alt="" className="w-5 h-5 " />
                    )}
                  </a>
                )}
              </>
            )}

            {/* Profile link copy */}
            <Button
              variant={
                selectedMode === 'light' ? `secondaryOutline` : 'darkOutlined'
              }
              onClick={copyLinkHandler}
              className={`p-1.5 rounded hidden sm:flex align-top w-8 justify-center border ${
                selectedMode === 'light'
                  ? 'bg-neutral-200 border-primary-200'
                  : 'bg-dark-primary border-dark-border '
              } h-8 `}
            >
              {selectedMode === 'light' ? (
                <img ref={copyRef} src={Copy} alt="" className="w-5 h-5" />
              ) : (
                <img
                  ref={copyRef}
                  src={CopyWhiteIcon}
                  alt=""
                  className="w-5 h-5"
                />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
