class CreatePrivateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :private_messages do |t|
      t.string :body, null:false
      t.integer :sender_id, null:false
      t.integer :recipient_id, null:false

      t.timestamps
    end

    add_index :private_messages, :sender_id
    add_index :private_messages, :recipient_id
  end
end
