class ChangeServer < ActiveRecord::Migration[5.2]
  def change
    add_column :servers, :invite_code, :integer
    add_index :servers, :invite_code
  end
end
