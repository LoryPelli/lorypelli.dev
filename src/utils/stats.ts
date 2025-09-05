import { stats } from './url';

export default async function getStats(
    type: 'general' | 'contributions' | 'languages',
) {
    let url = '';
    switch (type) {
        case 'general': {
            url = stats.url.general;
            break;
        }
        case 'contributions': {
            url = stats.url.contributions;
            break;
        }
        case 'languages': {
            url = stats.url.languages;
            break;
        }
    }
    const res = await fetch(url);
    return new Response(res.body, {
        headers: {
            'Content-Type': res.headers.get('Content-Type') || '',
        },
    });
}
