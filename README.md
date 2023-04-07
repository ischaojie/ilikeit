# ILIKEIT
> I like it!

## What is it?

This is a simple like counter. It's a serverless application built with Cloudflare Workers.

## Usage

Give a source name, you can get the like count and like it.

- Get like count
    ```
    GET https://ilikeit.chaojie.workers.dev/?source='test'
    ```

- Like it

    ```
    POST https://ilikeit.chaojie.workers.dev/?source='test'
    ```
