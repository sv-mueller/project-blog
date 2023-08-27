import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet/CodeSnippet";

export async function generateMetadata({ params }) {
	const { frontmatter } = await loadBlogPost(params.postSlug);

	return {
		title: `${frontmatter.title}’ • ${BLOG_TITLE}`,
		description: frontmatter.abstract,
	};
}

async function BlogPost({ params }) {
	const { content, frontmatter } = await loadBlogPost(params.postSlug);
	return (
		<article className={styles.wrapper}>
			<BlogHero
				title={frontmatter.title}
				publishedOn={frontmatter.publishedOn}
			/>
			<div className={styles.page}>
				<MDXRemote source={content} components={{ pre: CodeSnippet }} />
			</div>
		</article>
	);
}

export default BlogPost;
