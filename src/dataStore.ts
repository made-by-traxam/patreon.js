import { Pledge } from "./models/pledge";
import { Campaign } from "./models/campaign";
import { User } from "./models/user";
import { Reward } from "./models/reward";
import { Goal } from "./models/goal";
import { PatreonObject } from "./patreonObject";
import { RawPatreonObject, WrappedRawPatreonObject } from "./rawPatreonObject";
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

  /**
   * Parses an API response into a data store.
   * @param response the api response as an object.
   * @see primaryObject for the object in `response.data`
   */
  parseResponse(response: WrappedRawPatreonObject &
                                  {included?: RawPatreonObject[]}) {
    const included = response.included;
    if (included !== undefined) {
      included.forEach(object => {
        this._parseObject(object);
      });
    }
    
    const data = response.data;
    if (Array.isArray(response.data)) {
      const array = <RawPatreonObject[]> data;
      this.primaryObject = array.map(raw => this._parseObject(raw));
    } else {
      const single = <RawPatreonObject> data;
      this.primaryObject = this._parseObject(single);
    }
  }

  private _parseObject(raw: RawPatreonObject): PatreonObject {
    const obj = this._getOrCreate(raw.type, raw.id);
    obj.parse(raw, this);
    return obj;
  }

  private _getOrCreate(type: string, id: string): PatreonObject {
    var Type;
    switch(type) {
      case 'address':
        let address = this._getAddress(id);
        if (address === undefined) {
          address = new Address(this.api, id);
          this.addresses.push(address);
        }
        return address;
      case 'campaign':
        let campaign = this._getCampaign(id);
        if (campaign === undefined) {
          campaign = new Campaign(this.api, id);
          this.campaigns.push(campaign);
        }
        return campaign;
      case 'goal':
        let goal = this._getGoal(id);
        if (goal === undefined) {
          goal = new Goal(this.api, id);
          this.goals.push(goal);
        }
        return goal;
      case 'pledge':
        let pledge = this._getPledge(id);
        if (pledge === undefined) {
          pledge = new Pledge(this.api, id);
          this.pledges.push(pledge);
        }
        return pledge;
      case 'reward':
        let reward = this._getReward(id);
        if (reward === undefined) {
          reward = new Reward(this.api, id);
          this.rewards.push(reward);
        }
        return reward;
      case 'user':
        let user = this._getUser(id);
        if (user === undefined) {
          user = new User(this.api, id);
          this.users.push(user);
        }
        return user;
      default:
        return undefined; // we don't have or want such objects in our data
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
   * @returns the referenced reward or null if the reference is nullish.
   */
  getReward(ref: Reference): Reward {
    if (this._isRefNullish(ref)) return null;
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
   * @returns the referenced address or null if the reference is nullish.
   */
  getAddress(ref: Reference): Address {
    if (this._isRefNullish(ref)) return null;
    return this._getAddress(ref.data.id);
  }

  /**
   * Checks whether a reference is nullish.
   * @param ref the reference to check.
   * @returns false if the reference or the included data is null.
   */
  private _isRefNullish(ref: Reference): boolean {
    return ref === null || ref.data === null
  }
}
