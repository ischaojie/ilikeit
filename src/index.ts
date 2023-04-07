
export interface Env {
	KV_ILIKEIT: KVNamespace;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const { searchParams } = new URL(request.url);
		let source: string = searchParams.get('source') || request.url;
		const encoder = new TextEncoder();
		let key: string = btoa(encoder.encode('ilikeit:' + source));
		let like_count = await env.KV_ILIKEIT.get(key);
		if (request.method === 'POST') {
			like_count = like_count ? parseInt(like_count) + 1 : 1;
			await env.KV_ILIKEIT.put(key, like_count);
		}
		like_count = like_count ? parseInt(like_count) : 0;

		const headers = {
			"content-type": "application/json;charset=UTF-8",
			"Access-Control-Allow-Origin": "*",
		};
		const data = {
			source: source,
			like_count: like_count,
		};

		const json = JSON.stringify(data, null, 2);
		return new Response(json, { headers: headers });
	}
};
