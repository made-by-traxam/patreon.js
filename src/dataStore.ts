import { Pledge } from "./models/pledge";
import { Campaign } from "./models/campaign";
import { User } from "./models/user";
import { Reward } from "./models/reward";
import { Goal } from "./models/goal";
import { PatreonObject } from "./patreonObject";
import { PatreonAPI } from "./patreonApi";
import { Address } from "./models/address";

/**
 * A data model only containing a reference.
 */
class Reference {
  data: {
    id: string;
  }
}

class ReferenceCollection {
  data: [{
    id: string;
  }]
}

/**
 * A data store managing all included data in a Patreon API request.
 */
export class DataStore {
  api: PatreonAPI;
  primaryObject: PatreonObject | PatreonObject[];
  users: User[];
  campaigns: Campaign[];
  pledges: Pledge[];
  rewards: Reward[];
  goals: Goal[];
  addresses: Address[];

  /**
   * Constructs a new data store.
   * @see parseResponse for parsing response data.
   */
  constructor(api: PatreonAPI) {
    this.api = api;
    this.addresses = [];
    this.users = [];
    this.campaigns = [];
    this.pledges = [];
    this.rewards = [];
    this.goals = [];
  }


  }

  private _getUser(id: string): User {
    return this.users.find(user => user.id === id);
  }

  /**
   * Gets a referenced user from included data.
   * @param ref a user reference.
   */
  getUser(ref: Reference): User {
    return this._getUser(ref.data.id);
  }

  private _getCampaign(id: string): Campaign {
    return this.campaigns.find(campaign => campaign.id === id);
  }

  /**
   * Gets a referenced campaign.
   * @param ref a campaign reference.
   */
  getCampaign(ref: Reference): Campaign {
    return this._getCampaign(ref.data.id);
  }

  private _getPledge(id: string): Pledge {
    return this.pledges.find(pledge => pledge.id === id);
  }

  /**
   * Gets a referenced pledge.
   * @param ref a pledge reference.
   */
  getPledge(ref: Reference): Pledge {
    return this._getPledge(ref.data.id);
  }

  private _getReward(id: string): Reward {
    return this.rewards.find(reward => reward.id === id);
  }

  /**
   * Gets a referenced reward.
   * @param ref a reward reference.
   */
  getReward(ref: Reference): Reward {
    return this._getReward(ref.data.id);
  }

  /**
   * Gets a bunch of referenced rewards.
   * @param refs a bunch of reward references.
   */
  getRewards(refs: ReferenceCollection): Reward[] {
    return refs.data.map(ref => this._getReward(ref.id));
  }

  private _getGoal(id: string): Goal {
    return this.goals.find(goal => goal.id === id);
  }

  /**
   * Gets a referenced goal.
   * @param ref a goal reference.
   */
  getGoal(ref: Reference): Goal {
    return this._getGoal(ref.data.id);
  }

  /**
   * Gets a bunch of referenced goals.
   * @param refs a bunch of goal references.
   */
  getGoals(refs: ReferenceCollection): Goal[] {
    return refs.data.map(ref => this._getGoal(ref.id));
  }

  private _getAddress(id: string): Address {
    return this.addresses.find(address => address.id === id);
  }

  /**
   * Gets a referenced address.
   * @param ref an address reference.
   */
  getAddress(ref: Reference): Address {
    return this._getAddress(ref.data.id);
  }
}
