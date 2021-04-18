class CreateFriendships < ActiveRecord::Migration[5.2]
  def change
    create_table :friendships do |t|
      t.integer :friender_id, null:false
      t.integer :friendee_id, null:false
      t.boolean :accepted, null:false
      t.timestamps
    end

    add_index :friendships, [:friender_id, :friendee_id], unique:true
  end
end
