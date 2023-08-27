import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";
import CodeSnippet from "@/components/CodeSnippet/CodeSnippet";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner/Spinner";

export async function generateMetadata({ params }) {
	const { frontmatter } = await loadBlogPost(params.postSlug);

	return {
		title: `${frontmatter.title}’ • ${BLOG_TITLE}`,
		description: frontmatter.abstract,
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
	const { content, frontmatter } = await loadBlogPost(params.postSlug);
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
