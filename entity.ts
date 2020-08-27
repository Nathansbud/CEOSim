enum Timestamp {
    Day = 1,
    Week = 7,
    Month = 30,
    Month_L = 31,
    Year = 365
}

enum EntityBehavior {
    None = 0,
    Craftable   = 1 << 0,
    TimeLimited = 1 << 1,
}

type Quality = 'trash' | 'low' | 'normal' | 'high' | 'excellent' 
class Entity {
    private _name: string
    private _cost: number
    
    private _lifetime: number | Timestamp //Total entity lifetime
    private _expiry: number | Timestamp //Time units remaining    

    private _id: string
    private _flags?: EntityBehavior
    private _quality?: Quality
    
    constructor(name: string, cost: number, lifetime: number | Timestamp, id: string, quality?: Quality, flags?: EntityBehavior) {
        this._name = name
        this._cost = cost
        
        this._lifetime = lifetime
        this._expiry = lifetime

        this._id = id
        this._flags = flags
    }

    public age = () => this._lifetime - this._expiry
    

    public get name() : string {return this._name}


    public get cost() : number {return this._cost}
    public set cost(nCost: number) {this._cost = nCost} 
    public get expiry() : number {return this._expiry}
}

class Purchasable {
    static get Apple() : Entity {return new Entity("Apple", 10, 7, "P_APPLE")}
    static get Pear() : Entity {return new Entity("Pear", 10, 7, "P_PEAR")}
}

export {Timestamp, EntityBehavior, Quality, Entity, Purchasable}