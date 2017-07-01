class CreateVote < ActiveRecord::Migration[5.1]
  def change
    create_table :votes do |t|
      t.string :color

      t.timestamps
    end
  end
end
