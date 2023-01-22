# Ad System Coding Exercise

## Summary

This is a coding exercise to build a sample implementation to offer different online advertising products to recruiters.

| Name | Description | Retail Price |
|:---- |:----------- | ------------:|
| Classic Ad | Offers the most basic level of advertisement | $269.99 |
| Stand out Ad | Allows advertisers to use a company logo and use a longer presentation text | $322.99 |
| Premium Ad | Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility | $394.99 |

We have established a number of special pricing rules for a small number of privileged customers:

1. SecondBite
   * Gets a 3​ for 2​ deal on ​Classic Ads  
   
2. Axil Coffee Roasters
   * Gets a discount on ​Standout Ads ​where the price drops to $​299.99 p​er ad
   
3. MYER
   * Gets a 5​ for 4​ deal on ​Stand out Ads
   * Gets a discount on​ Premium Ads ​where the price drops to $​389.99 ​per ad

These details are regularly renegotiated, so we need the pricing rules to be as flexible as possible as they can change in the future with little notice.

## Getting Started

### Prerequisites

#### Environment

You will need the following tools installed to build and run this project:

- [Node.js v16.15.0](https://nodejs.org/en/download/)

I'd recommend using a Node version switcher such as [nvm](https://github.com/nvm-sh/nvm) to switch versions conveniently.

Assuming `nvm`, swapping to Node v12.13.0 might look like `nvm install 16.15.0 && nvm use 16.15.0`.

#### Package Manager

This project uses the [Yarn](https://yarnpkg.com/en/docs/install)
package manager rather than NPM.
Although you can use technically use NPM with this project,
NPM will not be able to use Yarn's lock file
which may cause version skew.

You can install Yarn with NPM:

    $ npm i -g yarn

Or via their [website](https://yarnpkg.com/en/docs/install)

#### Dependencies

To build/run this project you will need to install some dependencies.
They are specified in the `package.json` file. 

Use Yarn to install the dependencies

    $ yarn install

### Testing

You can run unit tests on the code base by running:

    $ yarn test
