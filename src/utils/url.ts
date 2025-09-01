export const BASE_URL = import.meta.env.DEV
    ? 'http://localhost:4321'
    : 'https://lorypelli.dev';

export const GITHUB_URL = 'https://github.lorypelli.dev/';

export const stats = {
    url: {
        general:
            'https://github-readme-stats.vercel.app/api?username=LoryPelli&theme=dark&hide_border=true&show_icons=true&count_private=true',
        contributions:
            'https://streak-stats.demolab.com/?user=LoryPelli&theme=dark&hide_border=true',
        languages:
            'https://github-readme-stats.vercel.app/api/top-langs/?username=LoryPelli&theme=dark&hide_border=true&layout=compact',
    },
};
