var EventApplication = createReactClass({
  getInitialState: function() {
    return { events: [], sort_by: 'event_date', direction: 'asc', page: 1, pages: 0 };
  },

  componentDidMount: function() {
    this.getDataFromApi(this.state.page);
  },

  getDataFromApi: function(page) {
    var self = this;
    $.ajax({
      url: '/api/events',
      data: { page: page },
      success: function(data) {
        self.setState({ events: data.events, pages: parseInt(data.pages), page: parseInt(data.page) });
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', status, xhr, error);
      }
    });
  },

  handleSearch: function(events) {
    this.setState({ events: events });
  },

  handleAdd: function(event) {
    this.getDataFromApi(this.state.page);
  },

  handleUpdateRecord: function(old_event, event) {
    var events = this.state.events.slice();
    var index = events.indexOf(old_event);
    events.splice(index, 1, event);
    this.setState({ events: events });
  },

  handleDeleteRecord: function(event) {
    this.getDataFromApi(this.state.page);
  },

  handleSortColumn: function(field_name, direction) {
    if (this.state.sort_by != field_name) {
      direction = 'asc';
    }

    $.ajax({
      url: '/api/events',
      data: { sort_by: field_name, direction: direction },
      method: 'GET',
      success: function(data) {
        this.setState({ events: data.events, sort_by: field_name, direction: direction });
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot sort events: ', status, xhr, error);
      }
    });
  },

  handleChangePage: function(page) {
    this.getDataFromApi(page);
  },

  render: function() {
    return(
      <div className = "container">
        <div className = "jumbotron">
          <h1>ReactJS Tutorial</h1>
          <p>by Piotr Jaworski</p>
        </div>
        <div className = "row">
          <div className = "col-md-4">
            <SearchForm handleSearch={this.handleSearch} />
          </div>
          <div className = "col-md-8">
            <NewForm handleAdd={this.handleAdd} />
          </div>
        </div>
        <div className = "row">
          <div className = "col-md-12">
            <EventTable events={this.state.events}
                        sort_by={this.state.sort_by}
                        direction={this.state.direction}
                        handleDeleteRecord={this.handleDeleteRecord}
                        handleUpdateRecord={this.handleUpdateRecord}
                        handleSortColumn={this.handleSortColumn} />
            <Pagination page={this.state.page}
                        pages={this.state.pages}
                        handleChangePage={this.handleChangePage} />
          </div>
        </div>
      </div>
    )
  }
});
