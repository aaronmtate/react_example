module Api
  class EventsController < ApplicationController
    before_action :set_event, only: [:update, :destroy]

    def index
      rel = Event.all
      rel = rel.where('name LIKE ? OR place LIKE ? OR description LIKE ?', "%#{query}%", "%#{query}%", "%#{query}%") unless query.blank?
      render json: {
        events: rel.order(sort_by + ' ' + direction).limit(per_page).offset((page - 1) * per_page),
        page: page,
        pages: (rel.count / per_page).to_i + (rel.count % per_page > 0 ? 1 : 0)
      }
    end

    def create
      event = Event.new(event_params)
      if event.save
        render json: event
      else
        render nothing: true, status: :bad_request
      end
    end

    def update
      if @event.update(event_params)
        render json: @event
      else
        render nothing: true, status: :unprocessable_entity
      end
    end

    def destroy
      @event.destroy
      head :no_content
    end

    private

    def event_params
      params.require(:event).permit(:name, :event_date, :place, :description)
    end

    def set_event
      @event = Event.find(params[:id])
    end

    def sort_by
      %w(name place description event_date).include?(params[:sort_by]) ? params[:sort_by] : 'event_date'
    end

    def direction
      %w(asc desc).include?(params[:direction]) ? params[:direction] : 'asc'
    end

    def page
      (params[:page] || 1).to_i
    end

    def per_page
      (params[:per_page] || 10).to_i
    end

    def query
      params[:query]
    end
  end
end
