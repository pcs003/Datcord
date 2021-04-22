class ChangePrivateMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :private_messages, :edited, :boolean, :null => false, :default => false
    add_column :channel_messages, :edited, :boolean, :null => false, :default => false
  end
end
