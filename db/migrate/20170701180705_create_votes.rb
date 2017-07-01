class CreateVotes < ActiveRecord::Migration[5.1]
  def change
    create_table :votesjk do |t|
      t.string :color

      t.timestamps
    end
  end
end
