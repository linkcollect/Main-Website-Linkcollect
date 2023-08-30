import React from 'react';
import { Helmet } from 'react-helmet-async';
export default function SEO(
    {title="LinkCollect, Save and Share Resources Blazingly Fast", description="Linkcollect, most loved bookmarking tool for people to collect, curate and share amazing resources", image="https://linkcollect.io/static/media/mainLogo.71d1a218042d27dad79cc550d564c867.svg"}) {

return (
<Helmet>
{ /* Standard metadata tags */ }
<title>{title}</title>
<meta name='description' content={description} />
{ /* End standard metadata tags */ }
{ /* Facebook tags */ }
<meta property="og:type" content='website'/>
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />
{ /* End Facebook tags */ }
</Helmet>
)
}