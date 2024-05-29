## React Coding Challenge - Somnio

Challenge link: https://admin-gold-tau.vercel.app

# Implementation

* The strategy for this challenge is make the first render in the server with some users content in order to render fast.
* Make a pagination in order to avoid a big network request
* Use url based as source of truth in order that the admin can update and resume, and share a specific filter in order to make management easier.
* There are no use of context since the max deep for passing props was one level

# Tech-Debth

* Mocking up server side data for main test cases scenario in E2E tests
* Make unit tests for get keys from urls functions
