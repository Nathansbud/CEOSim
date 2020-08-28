import {Entity, Inventory, Purchasable} from "./entity.js"
import {Game} from "./game.js"

class GameManager {
    private static manager: GameManager
    public Game: Game
    public formatter: Intl.NumberFormat 
    
    private fundText: HTMLSpanElement
    private earningText: HTMLSpanElement
    private debtText: HTMLSpanElement

    private inventoryButton: HTMLButtonElement
    private inventoryPopup: HTMLDivElement
    private inventoryItems: HTMLUListElement

    private workButton: HTMLButtonElement
    private hireButton: HTMLButtonElement

    private constructor() {
        this.Game = Game.getInstance()
        this.formatter = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
        
        this.fundText = document.getElementById('funds') as HTMLSpanElement
        this.earningText = document.getElementById('earn-rate') as HTMLSpanElement
        this.debtText = document.getElementById('debt') as HTMLSpanElement

        this.inventoryButton = document.getElementById('inventory-button') as HTMLButtonElement
        this.inventoryPopup = document.getElementById('inventory') as HTMLDivElement
        this.inventoryItems = document.getElementById('inventory-items') as HTMLUListElement
        
        this.workButton = document.getElementById('work-button') as HTMLButtonElement
        this.hireButton = document.getElementById('hire-button') as HTMLButtonElement
        this.createEventListeners()
        this.update()
    }

    private buildInventory() {
        while(this.inventoryItems.lastChild) {
            this.inventoryItems.removeChild(this.inventoryItems.lastChild)
        }

        if(Object.keys(this.Game.inventory).length > 0) {
            this.inventoryItems.append(...Object.entries(this.Game.inventory)
                                                .map(([k, v]) => this.createElement('li', `${k}: ${(v as Entity[]).length}`)))
        }
    }
    
    private closeInventory() {this.inventoryPopup.style.display = 'none'}
    private createEventListeners() {
        this.inventoryButton.onclick = () => {
            this.buildInventory()
            this.inventoryPopup.style.display = 'block'
            this.inventoryPopup.focus()
        }

        this.inventoryPopup.onkeydown = (e) => {
            switch(e.key) {
                case "Escape": this.closeInventory(); break
            }
        }

        this.workButton.onclick = () => {
            this.Game.work()
            this.updateFundText()
        }
    }
    
    private mf = (amt: number) => this.formatter.format(amt).slice(0, -3) //drop decimal
    private createElement(tagName: string, textContent?: string, attrs?: any) {
        let element = document.createElement(tagName)
        if(textContent) element.textContent = textContent  
        if(attrs) {      
            for(const [k, v] of Object.entries(attrs)) {
                element.setAttribute(k, (v as any).toString())
            }
        }
        return element
    }


    private updateFundText = () => this.fundText.textContent = this.mf(this.Game.funds)
    private updateEarningText = () => this.earningText.textContent = this.mf(this.Game.earnRate)
    private updateDebtText = () => this.debtText.textContent = this.mf(this.Game.debt)
    
    public update() {
        this.updateEarningText()
        this.updateFundText()
        this.updateDebtText()
    }
    public static getInstance() {
        if(!GameManager.manager) GameManager.manager = new GameManager()
        return GameManager.manager
    }
}

const Manager = GameManager.getInstance()
Manager.Game.addEntity(Purchasable.Apple())
Manager.Game.addEntity(Purchasable.Pear())