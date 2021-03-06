class BoatsController < ApplicationController

  def index
    @boats = Boat.totals

    respond_to do |format|
      format.html
      format.json { render json: @boats }
    end
    # respond_to do |format|
    #   format.json {
    #     render :json => [1,2,3,4,5]
    #   }
    # end
  end

  def create
    Boat.create(boat_params)
    @boats = Boat.totals
    respond_to do |format|
      format.js
    end
  end

  private

  def boat_params
    params.require(:boat).permit(:color)
  end

end
