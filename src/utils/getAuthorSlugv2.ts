
import { headers } from 'next/headers';

const getAuthorSlug = () => {
    const hostname:any = headers().get('host')
    const location = hostname.split(".")[0];
    const location2 = hostname.split(".")[1];
    console.log('hostname', hostname)

    const url = process.env.NEXT_URL;

    console.log('location1', location)
    console.log('location2', location2)
    console.log('url', url)

    const authorSlug:any = location != url ? location2 !== process.env.NEXT_SITE_NAME ? { custom_domain: true, domain1: location, domain2: location2 } : { custom_domain: false, domain1: location, domain2: 'no' } : { custom_domain: false, domain1: 'hrithik', domain2: 'no' };

    console.log('authorSlug', authorSlug)
    return authorSlug;
}

export default getAuthorSlug;