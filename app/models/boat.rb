class Boat < ApplicationRecord

  def self.totals
    [Boat.where(color: 'red').count, Boat.where(color: 'blue').count]
  end
end
