import { DojoProvider } from "@dojoengine/core";
import { Account } from "starknet";
import * as models from "./models.gen";

export async function setupWorld(provider: DojoProvider) {

	const spawn = async (account: Account) => {
		try {
			return await provider.execute(

				account,
				{
					contractName: "actions",
					entrypoint: "spawn",
					calldata: [],
				},
                "dojo_starter"
			);
		} catch (error) {
			console.error(error);
		}
	};

	const decreaseStats = async (account: Account) => {
		try {
			return await provider.execute(

				account,
				{
					contractName: "actions",
					entrypoint: "decrease_stats",
					calldata: [],
				},
                "dojo_starter"
			);
		} catch (error) {
			console.error(error);
		}
	};

	const feed = async (account: Account) => {
		try {
			return await provider.execute(

				account,
				{
					contractName: "actions",
					entrypoint: "feed",
					calldata: [],
				},
                "dojo_starter"
			);
		} catch (error) {
			console.error(error);
		}
	};

	const sleep = async (account: Account) => {
		try {
			return await provider.execute(

				account,
				{
					contractName: "actions",
					entrypoint: "sleep",
					calldata: [],
				},
                "dojo_starter"
			);
		} catch (error) {
			console.error(error);
		}
	};

	const play = async (account: Account) => {
		try {
			return await provider.execute(

				account,
				{
					contractName: "actions",
					entrypoint: "play",
					calldata: [],
				},
                "dojo_starter"
			);
		} catch (error) {
			console.error(error);
		}
	};

	const clean = async (account: Account) => {
		try {
			return await provider.execute(

				account,
				{
					contractName: "actions",
					entrypoint: "clean",
					calldata: [],
				},
                "dojo_starter"
			);
		} catch (error) {
			console.error(error);
		}
	};

	const worldDispatcher = async (account: Account) => {
		try {
			return await provider.execute(

				account,
				{
					contractName: "actions",
					entrypoint: "world_dispatcher",
					calldata: [],
				},
                "dojo_starter"
			);
		} catch (error) {
			console.error(error);
		}
	};

	const dojoName = async (account: Account) => {
		try {
			return await provider.execute(

				account,
				{
					contractName: "actions",
					entrypoint: "dojo_name",
					calldata: [],
				},
                "dojo_starter"
			);
		} catch (error) {
			console.error(error);
		}
	};

	// const upgrade = async (account: Account, newClassHash: ClassHash) => {
	// 	try {
	// 		return await provider.execute(

	// 			account,
	// 			{
	// 				contractName: "actions",
	// 				entrypoint: "upgrade",
	// 				calldata: [newClassHash],
	// 			}
	// 		);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	return {
		spawn,
		decreaseStats,
		feed,
		sleep,
		play,
		clean,
		worldDispatcher,
		dojoName,
		// upgrade,
	};
}
