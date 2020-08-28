import * as GameEntities from './entity.js'
import {GameWindow} from './gamewindow.js'

type Gender = 'm' | 'f' | 't' | null //male, female, enby
class Game {
    private static game: Game
    private static manager: GameWindow 

    private _earnRate: number
    private _funds: number
    private _debt: number

    private _ceo: string
    private _business: string
    private _gender: Gender

    private _inventory: any

    private constructor() {
        const gameState = this.loadGame()
        
        this._ceo = gameState._ceo ?? ""
        this._business = gameState._business ?? ""
        this._gender = gameState._gender 
        
        this._earnRate = gameState._salary ?? 0
        this._funds = gameState._funds ?? 0
        this._debt = gameState._debt ?? 0
        this._inventory = gameState._inventory ?? {} 

        Game.manager = GameWindow.getInstance()
    }

    public update() {
        Game.manager.update(this)
    }

    public addEntity(entity: GameEntities.Entity) : void {
        if(this._inventory[entity.name]) this._inventory[entity.name].push(entity)
        else this._inventory[entity.name] = [entity]
    }
    public addEntities = (...entity: GameEntities.Entity[]) : void => entity.forEach(ne => this.addEntity(ne))


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

const GameManager = Game.getInstance() //Singleton game manager
GameManager.update()
GameManager.addEntities(GameEntities.Purchasable.Apple(), GameEntities.Purchasable.Apple().modify({cost: 200}))
console.log(GameManager.inventory)