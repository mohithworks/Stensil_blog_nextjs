
import { headers } from 'next/headers';

const getAuthorSlug = () => {
    const hostname:any = headers().get('host')
    const location = hostname.split(".")[0];
    const location2 = hostname.split(".")[1];

    const url = process.env.NEXT_URL;

    const authorSlug:any = location != url ? location2 !== process.env.NEXT_SITE_NAME ? { custom_domain: true, domain1: location, domain2: location2 } : { custom_domain: false, domain1: location, domain2: 'no' } : { custom_domain: false, domain1: 'hrithik', domain2: 'no' };

    return authorSlug;
}

export default getAuthorSlug;