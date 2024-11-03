import type { SchemaType } from "@dojoengine/sdk";

// Type definition for `dojo_starter::models::Beast` struct
export interface Beast {
	fieldOrder: string[];
	player: string;
	is_alive: boolean;
	is_awake: boolean;
	hunger: number;
	max_hunger: number;
	energy: number;
	max_energy: number;
	happiness: number;
	max_happiness: number;
	hygiene: number;
	max_hygiene: number;
	attack: number;
	defense: number;
	speed: number;
	level: number;
	experience: number;
	next_level_experience: number;
}

// Type definition for `dojo_starter::models::BeastValue` struct
export interface BeastValue {
	fieldOrder: string[];
	is_alive: boolean;
	is_awake: boolean;
	hunger: number;
	max_hunger: number;
	energy: number;
	max_energy: number;
	happiness: number;
	max_happiness: number;
	hygiene: number;
	max_hygiene: number;
	attack: number;
	defense: number;
	speed: number;
	level: number;
	experience: number;
	next_level_experience: number;
}

export interface Schema extends SchemaType {
	dojo_starter: {
		Beast: Beast,
		BeastValue: BeastValue,
		ERC__Balance: ERC__Balance,
		ERC__Token: ERC__Token,
		ERC__Transfer: ERC__Transfer,
	},
}
export const schema: Schema = {
	dojo_starter: {
		Beast: {
			fieldOrder: ['player', 'is_alive', 'hunger', 'max_hunger', 'energy', 'max_energy', 'happiness', 'max_happiness', 'hygiene', 'max_hygiene'],
			player: "",
			is_alive: false,
			is_awake: false,
			hunger: 0,
			max_hunger: 0,
			energy: 0,
			max_energy: 0,
			happiness: 0,
			max_happiness: 0,
			hygiene: 0,
			max_hygiene: 0,
			attack: 0,
			defense: 0,
			speed: 0,
			level: 0,
			experience: 0,
			next_level_experience: 0,
		},
		BeastValue: {
			fieldOrder: ['is_alive', 'hunger', 'max_hunger', 'energy', 'max_energy', 'happiness', 'max_happiness', 'hygiene', 'max_hygiene'],
			is_alive: false,
			is_awake: false,
			hunger: 0,
			max_hunger: 0,
			energy: 0,
			max_energy: 0,
			happiness: 0,
			max_happiness: 0,
			hygiene: 0,
			max_hygiene: 0,
			attack: 0,
			defense: 0,
			speed: 0,
			level: 0,
			experience: 0,
			next_level_experience: 0,
		},
		ERC__Balance: {
			fieldOrder: ['balance', 'type', 'tokenmetadata'],
			balance: '',
			type: 'ERC20',
			tokenMetadata: {
				fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
				name: '',
				symbol: '',
				tokenId: '',
				decimals: '',
				contractAddress: '',
			},
		},
		ERC__Token: {
			fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
			name: '',
			symbol: '',
			tokenId: '',
			decimals: '',
			contractAddress: '',
		},
		ERC__Transfer: {
			fieldOrder: ['from', 'to', 'amount', 'type', 'executed', 'tokenMetadata'],
			from: '',
			to: '',
			amount: '',
			type: 'ERC20',
			executedAt: '',
			tokenMetadata: {
				fieldOrder: ['name', 'symbol', 'tokenId', 'decimals', 'contractAddress'],
				name: '',
				symbol: '',
				tokenId: '',
				decimals: '',
				contractAddress: '',
			},
			transactionHash: '',
		},

	},
};
// Type definition for ERC__Balance struct
export type ERC__Type = 'ERC20' | 'ERC721';
export interface ERC__Balance {
    fieldOrder: string[];
    balance: string;
    type: string;
    tokenMetadata: ERC__Token;
}
export interface ERC__Token {
    fieldOrder: string[];
    name: string;
    symbol: string;
    tokenId: string;
    decimals: string;
    contractAddress: string;
}
export interface ERC__Transfer {
    fieldOrder: string[];
    from: string;
    to: string;
    amount: string;
    type: string;
    executedAt: string;
    tokenMetadata: ERC__Token;
    transactionHash: string;
}

export enum Models {
    Beast = "dojo_starter-Beast",
}
