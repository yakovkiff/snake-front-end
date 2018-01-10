class SelectUserForm {
  static render() {
    return `
    <form id="select-user-form">
      <select name="carlist">
        <option value="" disabled selected>Select Username</option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
      <button type="button" id="load-saved-game">Load Saved Game</button>
    </form>
    `
  }
  static renderOnPage() {
    $('#select-user-form-container').html(this.render())
  }
}
