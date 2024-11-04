import { DojoProvider } from "@dojoengine/core";
import { Account } from "starknet";
import * as models from "./models.gen";

export async function setupWorld(provider: DojoProvider) {

	const actions_spawn = async (account: Account) => {
		try {
			return await provider.execute(
				account,
				{
					contractName: "actions",
					entryPoint: "spawn",
					calldata: [],
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_decreaseStats = async (account: Account) => {
		try {
			return await provider.execute(
				account,
				{
					contractName: "actions",
					entryPoint: "decrease_stats",
					calldata: [],
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_feed = async (account: Account) => {
		try {
			return await provider.execute(
				account,
				{
					contractName: "actions",
					entryPoint: "feed",
					calldata: [],
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_sleep = async (account: Account) => {
		try {
			return await provider.execute(
				account,
				{
					contractName: "actions",
					entryPoint: "sleep",
					calldata: [],
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_awake = async (account: Account) => {
		try {
			return await provider.execute(
				account,
				{
					contractName: "actions",
					entryPoint: "awake",
					calldata: [],
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_play = async (account: Account) => {
		try {
			return await provider.execute(
				account,
				{
					contractName: "actions",
					entryPoint: "play",
					calldata: [],
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_clean = async (account: Account) => {
		try {
			return await provider.execute(
				account,
				{
					contractName: "actions",
					entryPoint: "clean",
					calldata: [],
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const actions_revive = async (account: Account) => {
		try {
			return await provider.execute(
				account,
				{
					contractName: "actions",
					entryPoint: "revive",
					calldata: [],
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	return {
		actions: {
			spawn: actions_spawn,
			decreaseStats: actions_decreaseStats,
			feed: actions_feed,
			sleep: actions_sleep,
			awake: actions_awake,
			play: actions_play,
			clean: actions_clean,
			revive: actions_revive,
		},
	};
}