import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet/CodeSnippet";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner/Spinner";

import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
	const post = await loadBlogPost(params.postSlug);

	if (post === "not-found") return { status: 404 };

	return {
		title: `${post.frontmatter.title}’ • ${BLOG_TITLE}`,
		description: post.frontmatter.abstract,
	};
}

const LazyLoadedDivisionGroupsDemo = dynamic(
	() => import("@/components/DivisionGroupsDemo/DivisionGroupsDemo"),
	{
		ssr: false,
		loading: Spinner,
	}
);

const LazyLoadedCircularColorsDemo = dynamic(
	() => import("@/components/CircularColorsDemo/CircularColorsDemo"),
	{
		ssr: false,
		loading: Spinner,
	}
);

async function BlogPost({ params }) {
	const post = await loadBlogPost(params.postSlug);

	console.log("post", post);

	if (post === "not-found") {
		notFound();
	}

	const { content, frontmatter } = post;

	return (
		<article className={styles.wrapper}>
			<BlogHero
				title={frontmatter.title}
				publishedOn={frontmatter.publishedOn}
			/>
			<div className={styles.page}>
				<MDXRemote
					source={content}
					components={{
						pre: CodeSnippet,
						DivisionGroupsDemo: LazyLoadedDivisionGroupsDemo,
						CircularColorsDemo: LazyLoadedCircularColorsDemo,
					}}
				/>
			</div>
		</article>
	);
}

export default BlogPost;
