var Event = createReactClass({
  propTypes: {
    name: PropTypes.string,
    event_date: PropTypes.string,
    place: PropTypes.string,
    description: PropTypes.string,
  },

  handleDelete: function(e) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: '/api/events/' + this.props.event.id,
      success: function(data) {
        this.props.handleDeleteRecord(this.props.event);
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot delete requested record: ', xhr, status, error)
      }
    });
  },

  render: function() {
    var event = this.props.event;
    return(
      <tr>
        <td>{event.name}</td>
        <td>{event.event_date}</td>
        <td>{event.place}</td>
        <td>{event.description}</td>
        <td>
          <a className='btn btn-danger btn-xs' onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    )
  }
});
