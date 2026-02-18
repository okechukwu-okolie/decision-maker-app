export const labels = ["Important", "Urgent", "Unimportant", "Unurgent"];

export const modalTexts = {
  Important: `Definition: Activities that contribute to your high-level mission, 
              your values, and your high-priority goals.\n Importance is defined by your 
              Compass: it is what moves the needle in your life or career over the long term \n 
              Simple Example; Spending an hour planning your business strategy for the next year. 
              It doesn't have to be done today, but it is vital for your future success.`,
  Urgent: `
          Definition: Activities that require immediate attention.\n
          These are visible, "in your face," and usually associated with the Clock. 
          They press on us and insist on action, often because of someone else’s timeline or a looming deadline.\n
          Simple Example: A phone call ringing right now or an email marked "ASAP" from a colleague.
`,
  Unimportant: `Definition: Activities that do not contribute to your own mission or long-term goals.\n
                We often mistake these for being important simply because they are urgent or because they are "popular" (things everyone else is doing).\n

                Simple Example: Attending a meeting you were invited to where you have no contribution to make and nothing to learn, but you go just because it’s on the calendar.`,
                
  Unurgent: ` Definition: Activities that have no immediate deadline or "press" for your time. \n
              These can be the most dangerous because they are easy to procrastinate (if they are important) or easy to get lost in (if they are unimportant).

              \nSimple Example: Sorting through your junk mail folder or mindlessly scrolling through a social media feed.`,
};


export const styling = {
    decision:"px-2 py-3 rounded-lg bg-orange-500 text-white font-semibold shadow-md light-shadow disabled:opacity-50",
    cancel:"py-3 px-3 rounded-lg border border-gray-500 dark:border-white/6 text-gray-900 dark:text-white bg-gray-100 dark:bg-transparent light-shadow",
    evaluate:"py-3 px-3 rounded-lg border border-black dark:border-white/6 text-black dark:text-black bg-gray-100 dark:bg-transparent disabled:opacity-50 light-shadow",
    endGroup:"py-3 px-3 rounded-lg border border-gray-500 dark:border-white/6 text-gray-900 dark:text-white bg-gray-100 dark:bg-transparent disabled:opacity-50 light-shadow",
    edit:"py-1 px-2 rounded bg-gray-100 dark:bg-white/6 text-gray-900 dark:text-white text-sm light-shadow",
    delete:"py-1 px-2 rounded border border-red-300/60 text-red-600 dark:border-white/6 dark:text-red-300 text-sm light-shadow"
  }