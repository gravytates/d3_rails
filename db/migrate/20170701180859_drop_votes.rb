class DropVotes < ActiveRecord::Migration[5.1]
  def change
    drop_table :votes
    drop_table :votesjk
  end
end
