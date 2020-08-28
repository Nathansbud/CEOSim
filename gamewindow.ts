export class GameWindow {
    private static manager: GameWindow
    public formatter: Intl.NumberFormat 
    
    private fundText: HTMLSpanElement
    private earningText: HTMLSpanElement
    private debtText: HTMLSpanElement

    private inventoryPopup: HTMLDivElement

    private workButton: HTMLButtonElement
    private hireButton: HTMLButtonElement
    private inventoryButton: HTMLButtonElement


    private constructor() {
        this.formatter = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
        
        this.fundText = document.getElementById('funds') as HTMLSpanElement
        this.earningText = document.getElementById('earn-rate') as HTMLSpanElement
        this.debtText = document.getElementById('debt') as HTMLSpanElement

        this.inventoryPopup = document.getElementById('inventory') as HTMLDivElement
        
        this.workButton = document.getElementById('work-button') as HTMLButtonElement
        this.hireButton = document.getElementById('hire-button') as HTMLButtonElement
        this.inventoryButton = document.getElementById('inventory-button') as HTMLButtonElement
        
        this.inventoryButton.onclick = () => {
            this.inventoryPopup.style.display = 'block'
            this.inventoryPopup.focus()
        }
        this.inventoryPopup.onkeydown = (e) => {
            switch(e.key) {
                case "Escape": this.closeInventory(); break
            }
        }
    }

    public closeInventory() {this.inventoryPopup.style.display = 'none'}
    public update(gameObj: any) {
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

