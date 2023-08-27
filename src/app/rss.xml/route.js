import { BLOG_TITLE } from "@/constants";
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers";
import RSS from "rss";

export async function GET() {
	const blogPosts = await loadBlogPostData();

	const data = createRssFeed(blogPosts);

	return new Response(data, {
		headers: { "content-type": "application/xml" },
	});
}

async function loadBlogPostData() {
	const blogPosts = {};
	const blogPostList = await getBlogPostList();
	for (let blogPost of blogPostList) {
		const postData = await loadBlogPost(blogPost.slug);
		blogPosts[blogPost.slug] = postData;
	}
	return blogPosts;
}

function createRssFeed(blogPosts) {
	const feed = new RSS({
		title: BLOG_TITLE,
		description: "A wonderful blog about JavaScript",
		pubDate: new Date(),
	});

	for (const [slug, post] of Object.entries(blogPosts)) {
		feed.item({
			title: post.frontmatter.title,
			description: post.frontmatter.abstract,
			url: `http://example.com/${slug}`,
			date: post.frontmatter.publishedOn,
		});
	}

	return feed.xml();
}
