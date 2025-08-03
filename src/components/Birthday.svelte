<script lang="ts">
    import { DateTime } from 'luxon';
    import { SvelteDate } from 'svelte/reactivity';
    const currentYear = $state(new Date().getFullYear());
    const currentMonth = $state(new Date().getMonth() + 1);
    const currentDay = $state(new Date().getDay());
    const year = $derived(() => {
        if (
            currentMonth > birthMonth ||
            (currentMonth == birthMonth && currentDay > birthDay)
        ) {
            return currentYear + 1;
        }
        return currentYear;
    });
    const birthMonth = 5;
    const birthDay = 3;
    const difference = $derived(() =>
        nextBirthday.diffNow([
            'years',
            'months',
            'days',
            'hours',
            'minutes',
            'seconds',
        ]),
    );
    let nextBirthday = $derived(
        DateTime.fromJSDate(new SvelteDate(year(), birthMonth - 1, birthDay)),
    );
    let diff = $derived(difference());
    $effect(() => {
        const interval = setInterval(() => {
            diff = difference();
        }, 1000);
        return () => clearInterval(interval);
    });
</script>

<div class="flex gap-x-2">
    <div class="flex flex-col items-center">
        <span>{Math.round(diff.years)}</span>
        <span>Years</span>
    </div>
    <div class="flex flex-col items-center">
        <span>{Math.round(diff.months)}</span>
        <span>Months</span>
    </div>
    <div class="flex flex-col items-center">
        <span>{Math.round(diff.days)}</span>
        <span>Days</span>
    </div>
    <div class="flex flex-col items-center">
        <span>{Math.round(diff.hours)}</span>
        <span>Hours</span>
    </div>
    <div class="flex flex-col items-center">
        <span>{Math.round(diff.minutes)}</span>
        <span>Minutes</span>
    </div>
    <div class="flex flex-col items-center">
        <span>{Math.round(diff.seconds)}</span>
        <span>Seconds</span>
    </div>
</div>
