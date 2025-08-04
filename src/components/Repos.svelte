<script lang="ts">
    import { DateTime } from 'luxon';
    import { Toaster, toast } from 'svelte-sonner';
    import type { GithubRepo } from '../../types';
    import StarIcon from './StarIcon.svelte';
    import ForkIcon from './ForkIcon.svelte';
    const repos = $state<Omit<GithubRepo, 'fork'>[]>([]);
    let ended = $state(false);
    const perPage = 15;
    let page = $state(1);
    const icon = $state(
        (slug: string) =>
            `https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/main/icons/${slug}.svg`,
    );
    const fetchRepos = $state((page: number) =>
        fetch(
            `https://api.github.com/users/lorypelli/repos?per_page=${perPage}&page=${page}`,
        ).then(async (res) => {
            const allRepos: GithubRepo[] = await res.json();
            if (allRepos.length == 0) {
                toast.error('No more repositories!');
                ended = true;
            }
            for (let repo of allRepos) {
                if (!repo.fork) {
                    repos.push(repo);
                }
            }
        }),
    );
    $effect(() => void fetchRepos(page));
</script>

<Toaster richColors />
<div class="flex flex-col gap-y-1">
    <div class="grid grid-cols-3 gap-2 md:grid-cols-4">
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
                            loading="lazy"
                            decoding="async"
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
    {#if !ended}
        <button
            onclick={() => page++}
            class="cursor-pointer rounded-xl border-2 p-3 hover:bg-gray-200"
            >Load More!</button
        >
    {/if}
</div>
