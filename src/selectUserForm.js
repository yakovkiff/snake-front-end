class SelectUserForm {
  static render() {
    return `
    <form id="select-user-form">
      <select id="user-selection" class="form-control">
        <option value="" disabled selected>Select Username</option>
      </select>
      <button type="button" id="load-saved-game" class="btn btn-warning">Load Saved Game</button>
    </form>
    `
  }
  static renderOnPage() {
    $('#select-user-and-load-game-container').html(this.render())
  }
}
