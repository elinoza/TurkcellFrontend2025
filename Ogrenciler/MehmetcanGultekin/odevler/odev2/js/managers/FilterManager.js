export class FilterManager {
    constructor(gameService, displayCallback) {
        this.gameService = gameService;
        this.displayCallback = displayCallback;
        this.categoryFilter = document.getElementById('categoryFilter');
        this.searchInput = document.getElementById('searchInput');
        
        const filterContext = this;  
        this.categoryFilter.addEventListener('change', this.handleFilter.bind(filterContext));
    }

    handleFilter(event) {
        const category = event.target.value;
        const searchTerm = this.searchInput.value.trim();  
        const filteredGames = this.gameService.filterGames(searchTerm, category);
        this.displayCallback(filteredGames);
    }
}