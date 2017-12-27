var Event = createReactClass({
  propTypes: {
    name: PropTypes.string,
    event_date: PropTypes.string,
    place: PropTypes.string,
    description: PropTypes.string,
  },

  getInitialState: function() {
    return { edit: false };
  },

  validRecord: function() {
    if (this.recordValue('name') && this.recordValue('event_date') && this.recordValue('place') && this.recordValue('description')) {
      return true;
    } else {
      return false;
    };
  },

  recordValue: function(field) {
    return ReactDOM.findDOMNode(this.refs[field]).value;
  },

  handleToggle: function(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  },

  handleUpdate: function(e) {
    e.preventDefault();
    if (this.validRecord()) {
      var event_data = {
        name: this.recordValue('name'),
        event_date: this.recordValue('event_date'),
        place: this.recordValue('place'),
        description: this.recordValue('description')
      };

      $.ajax({
        method: 'PUT',
        url: '/api/events/' + this.props.event.id,
        data: { event: event_data },
        success: function(data) {
          this.props.handleUpdateRecord(this.props.event, data);
          this.setState({ edit: false });
        }.bind(this),
        error: function(xhr, status, error) {
          alert('Cannot update requested record: ', xhr, status, error);
        }
      });
    } else {
      alert('Please fill in all fields.');
    }
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

  renderForm: function(e) {
    return(
      <tr>
        <td>
          <input type='text' className='form-control' name='name' ref='name' defaultValue={this.props.event.name} />
        </td>
        <td>
          <input type='date' className='form-control' name='event_date' ref='event_date' defaultValue={this.props.event.event_date} />
        </td>
        <td>
          <input type='text' className='form-control' name='place' ref='place' defaultValue={this.props.event.place} />
        </td>
        <td>
          <input type='text' className='form-control' name='description' ref='description' defaultValue={this.props.event.description} />
        </td>
        <td>
          <a className='btn btn-success btn-sm' onClick={this.handleUpdate}>Save</a>
          <a className='btn btn-default btn-sm' onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    )
  },

  renderRecord: function(e) {
    var event = this.props.event;
    return(
      <tr>
        <td>{event.name}</td>
        <td>{event.event_date}</td>
        <td>{event.place}</td>
        <td>{event.description}</td>
        <td>
          <a className='btn btn-primary btn-xs' onClick={this.handleToggle}>Edit</a>
          <a className='btn btn-danger btn-xs' onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    )
  },

  render: function() {
    if (this.state.edit) {
      return(this.renderForm());
    } else {
      return(this.renderRecord());
    }
  }
});
