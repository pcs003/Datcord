class ChangeChannel < ActiveRecord::Migration[5.2]
  def change
    rename_column :channels, :type, :channel_type
  end
end
