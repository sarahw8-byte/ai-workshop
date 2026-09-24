# Roadmap

## What this is
A study task list for people learning a language. Each task is tagged with a skill, so a learner can see which skill they have been avoiding.

## What Done means
A stranger opens the live site and creates an account with an email and password. They add study tasks, and each task gets one of six skills: Reading, Writing, Listening, Speaking, Vocabulary or Grammar. They check tasks off and see how many finished tasks each skill has, with the least-practiced skill flagged. When they log out and come back, their tasks and checkmarks are still there, and nobody else can see them. That is the whole project; everything else is backlog.

## Slices
1. Sign up and log in | done-criteria: (a) A logged-out visitor clicks "Sign up", enters test1@example.com and a password of 8 or more characters, submits, and lands on a page that says "Signed in as test1@example.com". (b) Clicking "Log out" shows "Log in" and "Sign up" buttons, and the email no longer appears anywhere on the page. (c) Logging in as test1@example.com with the wrong password shows "Wrong email or password", and the "Log in" button is still showing. (d) After logging in, the person closes the tab and opens the site address again, and it shows "Signed in as test1@example.com" without them typing anything. | status: ACTIVE
2. Add tasks that stay | done-criteria: (a) Signed in, a person types "Watch one episode with Spanish subtitles", picks "Listening" from the skill menu, clicks "Add", and the task appears in the list with a "Listening" label. (b) The task is still in the list after refreshing the page, and again after logging out and back in. (c) Signed in as test2@example.com, the list does not show test1's task. (d) Clicking "Add" with the task box empty, or with no skill picked, adds nothing and shows a message saying what is missing. | status: pending
3. Check off tasks and see the neglected skill | done-criteria: (a) Clicking the checkbox next to a task crosses it out, and it is still crossed out after a refresh. (b) A "Skill balance" box lists all six skills, each with its number of done tasks; checking a Listening task raises the Listening number by exactly 1, and unchecking it lowers it by 1. (c) The skill with the lowest number shows "Least practiced" next to it; if skills are tied, each tied skill shows it; on a brand-new account, all six show it. | status: pending

## Backlog
- Editing or deleting tasks
- Custom skills, or more than one skill per task
- A language field (Spanish, Japanese, and so on)
- Due dates, reminders, and time windows like "this week"
- Charts and streaks
- Password reset
- Email confirmation on sign-up
- Sign-in with Google or another account
- Sharing lists with a teacher or classmates
- A mobile app
