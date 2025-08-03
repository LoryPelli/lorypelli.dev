<script lang="ts">
    import { DateTime } from 'luxon';
    import type { GithubRepo } from '../../types';
    import StarIcon from './StarIcon.svelte';
    import ForkIcon from './ForkIcon.svelte';
    const repos = $state<Omit<GithubRepo, 'fork'>[]>([]);
    const icon = $derived(
        (slug: string) =>
            `https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/${slug}.svg`,
    );
    fetch('https://api.github.com/users/lorypelli/repos').then(async (res) => {
        const allRepos: GithubRepo[] = await res.json();
        for (let repo of allRepos) {
            if (!repo.fork) {
                repos.push(repo);
            }
        }
    });
</script>

<div class="grid grid-cols-4 gap-2">
    {#each repos as repo}
        <a
            href={repo.html_url}
            class="flex flex-col justify-center rounded-md border-2 p-2 hover:bg-gray-200"
        >
            {#if repo.archived}
                <div
                    class="flex justify-center rounded-md bg-red-600 py-1 text-center font-bold text-white"
                >
                    <span>This repository was archived!</span>
                </div>
            {/if}
            <div class="flex justify-center gap-x-1">
                <span>{repo.name}</span>
                {#if repo.language}
                    <img
                        src={icon(repo.language.toLowerCase())}
                        alt="repo.language"
                        class="inline size-6"
                    />
                {/if}
            </div>
            <div class="flex justify-center gap-x-1">
                <span>{repo.stargazers_count}</span>
                <StarIcon />
                <span>{repo.forks_count}</span>
                <ForkIcon />
            </div>
            <div class="flex justify-center">
                {DateTime.fromISO(repo.created_at).toRelative({
                    locale: 'en',
                })}
            </div>
        </a>
    {/each}
</div>
