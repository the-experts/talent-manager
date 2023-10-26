# Talent Manager

This is the the/experts [the/experts](https://the-experts.nl) Talent Manager app, a project built with [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Run the package installation

```bash
yarn
```

Create a .env file in the root level of the app.
You need some environment variables in order to run the app locally, which enable Clerk SSO authentication and Vercel DB access.
Please request those in the #talent-manager-2-development Slack channel.

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser
Log in via your the-experts Google Account.

## Technical Information

### Roles

Any Talent Manager user is being assigned a role.
The default user role is 'Employee', but the additional roles 'Admin' and 'Sales' are available.
As of writing this readme, these additional roles need to be assigned manually, but this will be automated or semi-automated in the future.

### Database

The database is a PostgreSQL DB hosted on vercel.com.

### SSO

Authentication is being facilitated via [Clerk](https://clerk.com/).
Side note: I tried implementing the 'default' NextJSAuth solution. It was hell. Don't try implementing it if you value your sanity.
You have been warned.

## Interface

### Employee View

The default view upon logging in is the Employee skill view. This is a tabbed view of all skills the user assigned to themself.
The user can switch between different category views and the 'All' view.
Each tab contains a table with editable rows.
In the 'All' tab, you can add a new row and specify the category the new item belongs to.
When you are in one of the category tabs, the category for the new item will be the same as the tab you're currently on.
If you want to change the category of an item, you can do that by modifying the item in the 'All' tab.
The names of skills can not be changed, so if you need to change it, please create a new one.
Users can specify their ability and their interest level in each item on a scale from 0 to 5,
0 being 'no interest/ability at all' and 5 being 'love it/I'm a rockstar (ugh, that word) at it'.
All of these fields are mandatory.

### Sales View

The Sales View is not implemented yet, but the current idea is to have an extra sidebar item,
which links to a view containing a filterable table or list in which the Sales employee can filter by skill name or employee name
and will be presented with a view that contains:

- Employee name
- Skill name
- Ability
- Interest
  The sales employee can then sort this view by Ability and Interest scores.
  Optional: When clicking on the employee name, the Sales employee can navigate to a read-only view of that employee's Employee View.

## Learn More

To learn more about Next.js in general, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
