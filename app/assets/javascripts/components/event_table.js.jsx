var EventTable = createReactClass({
  handleDeleteRecord: function() {
    this.props.handleDeleteRecord();
  },

  handleUpdateRecord: function(old_event, event) {
    this.props.handleUpdateRecord(old_event, event);
  },

  handleSortColumn: function(field_name, direction) {
    this.props.handleSortColumn(field_name, direction);
  },

  render: function() {
    var events = [];
    this.props.events.forEach(
      function(event) {
        events.push(<Event event={event} key={'event' + event.id} handleDeleteRecord={this.handleDeleteRecord} handleUpdateRecord={this.handleUpdateRecord} />);
      }.bind(this)
    );

    return(
      <table className = "table table-striped">
        <thead>
          <tr>
            <th className="col-md-2 sortable">
              <SortColumn name='name' text='Name' sort_by={this.props.sort_by} direction={this.props.direction} handleSortColumn={this.handleSortColumn} />
            </th>
            <th className="col-md-1 sortable">
              <SortColumn name='event_date' text='Date' sort_by={this.props.sort_by} direction={this.props.direction} handleSortColumn={this.handleSortColumn} />
            </th>
            <th className="col-md-3 sortable">
              <SortColumn name='place' text='Place' sort_by={this.props.sort_by} direction={this.props.direction} handleSortColumn={this.handleSortColumn} />
            </th>
            <th className="col-md-4 sortable">
              <SortColumn name='description' text='Description' sort_by={this.props.sort_by} direction={this.props.direction} handleSortColumn={this.handleSortColumn} />
            </th>
            <th className="col-md-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events}
        </tbody>
      </table>
    )
  }
});
