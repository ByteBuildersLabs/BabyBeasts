import type { SchemaType } from "@dojoengine/sdk";

// Type definition for `dojo_starter::models::BeastValue` struct
export interface BeastValue {
	fieldOrder: string[];
	life: number;
	max_life: number;
	hungry: number;
	max_hungry: number;
	energy: number;
	max_energy: number;
	happiness: number;
	max_happiness: number;
	bath: number;
	max_bath: number;
	level: number;
	experience: number;
	next_level_experience: number;
}

// Type definition for `dojo_starter::models::Beast` struct
export interface Beast {
	fieldOrder: string[];
	player: string;
	life: number;
	max_life: number;
	hungry: number;
	max_hungry: number;
	energy: number;
	max_energy: number;
	happiness: number;
	max_happiness: number;
	bath: number;
	max_bath: number;
	level: number;
	experience: number;
	next_level_experience: number;
}

export interface Schema extends SchemaType {
	dojo_starter: {
		BeastValue: BeastValue,
		Beast: Beast,
		ERC__Balance: ERC__Balance,
		ERC__Token: ERC__Token,
		ERC__Transfer: ERC__Transfer,
	},
}
export const schema: Schema = {
	dojo_starter: {
		BeastValue: {
			fieldOrder: ['life', 'max_life', 'hungry', 'max_hungry', 'energy', 'max_energy', 'happiness', 'max_happiness', 'bath', 'max_bath', 'level', 'experience', 'next_level_experience'],
			life: 0,
			max_life: 0,
			hungry: 0,
			max_hungry: 0,
			energy: 0,
			max_energy: 0,
			happiness: 0,
			max_happiness: 0,
			bath: 0,
			max_bath: 0,
			level: 0,
			experience: 0,
			next_level_experience: 0,
		},
		Beast: {
			fieldOrder: ['player', 'life', 'max_life', 'hungry', 'max_hungry', 'energy', 'max_energy', 'happiness', 'max_happiness', 'bath', 'max_bath', 'level', 'experience', 'next_level_experience'],
			player: "",
			life: 0,
			max_life: 0,
			hungry: 0,
			max_hungry: 0,
			energy: 0,
			max_energy: 0,
			happiness: 0,
			max_happiness: 0,
			bath: 0,
			max_bath: 0,
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