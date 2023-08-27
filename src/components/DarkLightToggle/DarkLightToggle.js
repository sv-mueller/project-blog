"use client";
import React from "react";
import { Moon, Sun } from "react-feather";
import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

import styles from "./DarkLightToggle.module.css";

import Cookie from "js-cookie";
import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";

function DarkLightToggle({ initialTheme }) {
	const [theme, setTheme] = React.useState(initialTheme);

	function handleClick() {
		const nextTheme = theme === "light" ? "dark" : "light";

		setTheme(nextTheme);

		Cookie.set("color-theme", nextTheme, {
			expires: 1000,
		});

		const root = document.documentElement;
		const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

		root.setAttribute("data-color-theme", nextTheme);
		Object.entries(colors).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});
	}

	return (
		<button className={styles.action} onClick={handleClick}>
			{theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
			<VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
		</button>
	);
}

export default DarkLightToggle;
