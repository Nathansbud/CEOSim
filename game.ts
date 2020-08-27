import * as GameEntities from './entity.js'

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

    public addEntity(entity: GameEntities.Entity) {
        if(this._inventory[entity.name]) this._inventory[entity.name].push(entity)
        else this._inventory[entity.name] = [entity]
    }

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

class GameWindow {
    private static manager: GameWindow
    public formatter: Intl.NumberFormat 
    
    private fundText: HTMLSpanElement
    private earningText: HTMLSpanElement
    private debtText: HTMLSpanElement

    private workButton: HTMLButtonElement
    private hireButton: HTMLButtonElement


    private constructor() {
        this.formatter = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
        
        this.fundText = document.getElementById('funds') as HTMLSpanElement
        this.earningText = document.getElementById('earn-rate') as HTMLSpanElement
        this.debtText = document.getElementById('debt') as HTMLSpanElement

        this.workButton = document.getElementById('work-button') as HTMLButtonElement
        this.hireButton = document.getElementById('hire-button') as HTMLButtonElement
        
    }

    public update(gameObj: Game) {
        this.updateEarningText(gameObj.earnRate)
        this.updateFundText(gameObj.funds)
        this.updateDebtText(gameObj.debt)
    }

    public mf = (amt: number) => this.formatter.format(amt).slice(0, -3) //drop decimal

    public updateFundText = (amt: number) => this.fundText.textContent = this.mf(amt)
    public updateEarningText = (amt: number) => this.earningText.textContent = this.mf(amt)
    public updateDebtText = (amt: number) => this.debtText.textContent = this.mf(amt)


    public static getInstance() {
        if(!GameWindow.manager) GameWindow.manager = new GameWindow()
        return GameWindow.manager
    }
}

const GameManager = Game.getInstance() //Singleton game manager
GameManager.update()
GameManager.addEntity(GameEntities.Purchasable.Apple)
console.log(GameManager.inventory)