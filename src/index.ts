/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	KV_ILIKEIT: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		console.log(request.url);
		const { pathname } = new URL(request.url);
		if (pathname === '/like') {
			let path: string = 'iliekit:' + request.url;
			let key: string = btoa(path);
			let like_count = await env.KV_ILIKEIT.get(key);
			like_count = like_count ? parseInt(like_count) + 1 : 1;
			await env.KV_ILIKEIT.put(key, like_count);

			const headers = {
				"content-type": "application/json;charset=UTF-8",
			};
			const data = {
				path: path,
				count: like_count,
			};

			const json = JSON.stringify(data, null, 2);
			return new Response(json, { headers: headers });
		} else {
			return new Response('I like it!');
		}
	}
};
