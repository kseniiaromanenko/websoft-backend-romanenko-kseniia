# Backend Deployment: From Localhost to Production

**Objective:** Throughout this course, you have built powerful backend APIs using Node.js, Express, databases (MongoDB/PostgreSQL), and ORMs/ODMs (Prisma/Mongoose). Up until now, these have run exclusively on your own computer. In this assignment, you will research how to take your application out of your local environment and deploy it to the web so anyone can use it.

Please research and answer the following questions. Be prepared to discuss your findings and share your deployment blueprints with the class.

---

## Part 1: Deployment Concepts & Fundamentals

1. **What is deployment?** In your own words, what is backend deployment, and why is it absolutely necessary for a production application?
2. **The Deployment Process:** What actually happens behind the scenes during the deployment process—from pushing your code to GitHub to your API successfully responding to a request on the web?
3. **The Localhost Limitation:** Why is running an application on `localhost` (or leaving your personal computer running 24/7) unsuitable for real-world users?
4. **Separation of Concerns:** Why is it an industry standard to host your server code (Express) and your database (PostgreSQL or MongoDB) on separate managed services in production, rather than together on the same server?

---

## Part 2: Platform Landscape & Student Options

1. **Platform Research:** Research at least **two** backend application hosting platforms (e.g., Render, Railway, Fly.io, Vercel, Koyeb) and **two** Database-as-a-Service (DBaaS) providers (e.g., MongoDB Atlas, Neon, Supabase, Aiven).
   - _What specific free tiers do they offer for a Node.js + Mongoose/Prisma stack?_
2. **Cost Analysis:** Compare the costs and pricing models for these platforms once free limits are exceeded or if a credit card is required.
   - _Which options are the safest for students wanting to avoid unexpected charges?_

---

## Part 3: Understanding Free Tier Limits in Plain English

Hosting platforms have technical limits on their free tiers. Explain in simple, layperson terms what each of the following technical resource limits means, and describe the real-world impact on an end-user when that limit is hit.

1. **RAM / Memory Limits** (e.g., 512 MB)
2. **Cold Starts / Sleep Cycles / Inactivity Timeouts** (e.g., the server "spins down" after 15 minutes of non-use)
3. **Compute Hours & CPU Quotas** (e.g., 750 free execution hours per month)
4. **Database Storage & Active Connection Limits** (Include research on how ORMs like Prisma or Mongoose impact max database connections)
5. **Outbound Data Transfer / Bandwidth** (e.g., 5 GB/month)

---

## Part 4: Hands-On Deployment Research & Blueprint

Choose **one** application host and **one** database host from your research in Part 2. Consult their official documentation and write a clear, step-by-step tutorial for a classmate detailing exactly how to deploy a project using this stack.

Your instructions must cover:

- [ ] How to provision the remote database and retrieve the secure connection string/URI.
- [ ] How to set up environment variables (like `.env` secrets) safely on the hosting platform without committing them to version control.
- [ ] What build and start commands (e.g., `npm install`, `npx prisma generate`, `npm start`) the platform needs to execute to run the app.
- [ ] How to link a GitHub repository to enable automatic deployments whenever code is pushed.
- [ ] How to test and verify that the deployed public URL can successfully read and write to the remote database.

---

## Part 5: Pre-Deployment Checklist

Before pushing code to production, a developer must ensure their app is secure and optimized. Research and produce a comprehensive pre-deployment checklist. Include specific action items for the following categories:

- **Security:** How should you handle API keys, CORS origins, and security headers (e.g., using `helmet` or rate limiting)?
- **Database Management:** What is the correct way to handle database changes in production (e.g., `prisma migrate deploy` vs. `db push`) and index setup?
- **Error Handling & Logs:** How do you prevent sensitive server error stack-traces from being exposed to public users? Where do you go to read live application logs once deployed?
- **Environment Setup:** How should you clean up `devDependencies` and local testing configurations to ensure a lightweight production build?

## Part 6: Submission Instructions

This assignment is due **Today, September 29th, 2026 at 11:59pm** . Please submit your completed research assignment as a repository on GitHub and share the link with your instructor. Make sure your repository includes:

- A `README.md` file with your answers to Parts 1–3.
- A `deployment-blueprint.md` file with your step-by-step deployment instructions from Part 4.
- A `pre-deployment-checklist.md` file with your comprehensive checklist from Part 5.
