import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { uid } from 'uid';
import { IconPlus } from '@tabler/icons-react';
import { Button } from '@/components';
import { EditColorValue } from '../EditColorValue';
import { ColorVariable } from '@/types';
import './paeltteDisplayer.scss';
import { tooltipID } from '@/utils';

interface Props {
  className?: string;
  title: string;
  maxArray: number;
  colors: ColorVariable[];
  minArray: number;
  editColorAction: (index: number, color: string) => void;
  addNewColor?: boolean;
  addNewColorAction?: () => void;
  removeColorAction?: (index: number) => void;
}

export const PaletteDisplayer = ({
  className: customClassName,
  title,
  maxArray,
  colors,
  minArray,
  editColorAction,
  addNewColor,
  addNewColorAction,
  removeColorAction,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames('paletteDisplayer', {
        [customClassName as string]: customClassName,
      })}
    >
      <span className="paletteDisplayer_title">{title}</span>
      <div className="paletteDisplayer_box">
        <div className="paletteDisplayer_colorCollection">
          {colors.map((background, index) => (
            <EditColorValue
              color={background.value}
              key={uid()}
              editAction={(newColor: string) => {
                editColorAction(index, newColor);
              }}
              removeAction={
                removeColorAction && colors.length > minArray
                  ? () => removeColorAction(index)
                  : undefined
              }
            />
          ))}
        </div>
        {colors.length <= maxArray && addNewColor && (
          <Button
            iconOnly
            onClick={addNewColorAction}
            data-tooltip-id={tooltipID}
            data-tooltip-content={t('editor.baseColorSections.addColor')}
            data-tooltip-place="bottom"
          >
            <IconPlus />
          </Button>
        )}
      </div>
    </div>
  );
};
