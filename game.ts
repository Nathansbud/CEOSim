import {Entity, Inventory, Purchasable} from './entity.js'

type Gender = 'm' | 'f' | 't' | null //male, female, enby
class Game {
    private static game: Game

    private _earnRate: number
    private _funds: number
    private _debt: number

    private _ceo: string
    private _business: string
    private _gender: Gender

    private _inventory: Inventory

    private constructor() {
        const gameState = this.loadGame()
        
        this._ceo = gameState._ceo ?? ""
        this._business = gameState._business ?? ""
        this._gender = gameState._gender 
        
        this._earnRate = gameState._salary ?? 15
        this._funds = gameState._funds ?? 0
        this._debt = gameState._debt ?? 0
        this._inventory = gameState._inventory ?? {} 
    }

    public addEntity(entity: Entity) : void {
        if(this._inventory[entity.name]) this._inventory[entity.name].push(entity)
        else this._inventory[entity.name] = [entity]
    }
    public addEntities = (...entity: Entity[]) : void => entity.forEach(ne => this.addEntity(ne))


    private loadGame = () : any => JSON.parse(localStorage.getItem('save-game') as any) ?? {}
    public saveGame = () : void => localStorage.setItem('save-game', JSON.stringify(this))
    public static getInstance() {
        if(!Game.game) Game.game = new Game()
        return Game.game
    }

    public get inventory() : any {return this._inventory}
    public get earnRate() : number {return this._earnRate}
    public get funds() : number {return this._funds}
    public get debt() : number {return this._debt}
}

export {Game, Gender}
